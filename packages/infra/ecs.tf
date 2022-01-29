# api

resource "aws_ecs_cluster" "api-cluster" {
  name = "${local.project_name}-api-cluster"
}

resource "aws_ecs_task_definition" "api-task-def" {
  family = "${local.project_name}-api"

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs-task-execution-role.arn
  task_role_arn            = aws_iam_role.ecs-task-role.arn

  cpu    = 256
  memory = 512

  container_definitions = <<EOL
[
  {
    "name": "api",
    "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.ap-northeast-1.amazonaws.com/${aws_ecr_repository.api.name}:latest",
    "essential": true,
    "portMappings": [
      {
        "containerPort": 3000
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "ap-northeast-1",
        "awslogs-stream-prefix": "api",
        "awslogs-group": "${aws_cloudwatch_log_group.ecs-api.name}"
      }
    },
    "command": [
      "yarn",
      "start:prod"
    ],
    "linuxParameters": {
      "initProcessEnabled": true
    },
    "secrets": [
      {
        "name": "DB_HOST",
        "valueFrom": "${aws_ssm_parameter.db-host.arn}"
      },
      {
        "name": "DB_PASSWORD",
        "valueFrom": "${aws_ssm_parameter.db-password.arn}"
      },
      {
        "name": "DB_USER_NAME",
        "valueFrom": "${aws_ssm_parameter.db-user-name.arn}"
      },
      {
        "name": "DB_PORT",
        "valueFrom": "${aws_ssm_parameter.db-port.arn}"
      },
      {
        "name": "RAKUTEN_API_ID",
        "valueFrom": "${aws_ssm_parameter.rakuten-api-id.arn}"
      },
    ]
  }
]
EOL
}

resource "aws_ecs_service" "api-service" {
  depends_on = [aws_lb_listener.api-https]

  name                   = "${local.project_name}-api-service"
  cluster                = aws_ecs_cluster.api-cluster.name
  launch_type            = "FARGATE"
  desired_count          = 1
  task_definition        = aws_ecs_task_definition.api-task-def.arn
  enable_execute_command = true

  network_configuration {
    subnets          = aws_subnet.public-subnet.*.id
    security_groups  = [aws_security_group.api-ecs.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.api-lb-tg.arn
    container_name   = "api"
    container_port   = "3000"
  }

  lifecycle {
    ignore_changes = [desired_count]
  }
}

# IAM 関連リソース

data "aws_iam_policy_document" "ecs-task-assume-role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# task 実行のための IAM 関連リソース (ecs agent に付与される IAM role)

resource "aws_iam_role" "ecs-task-execution-role" {
  name               = "${local.project_name}-ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs-task-assume-role.json
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-attach" {
  role       = aws_iam_role.ecs-task-execution-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy" "ecs-task-execution-ssm-getparameters" {
  name = "ecs-task-execution-secret-parameterstore"
  role = aws_iam_role.ecs-task-execution-role.id

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "ssm:GetParameters"
        ],
        "Effect": "Allow",
        "Resource": [
          "*"
        ]
      }
    ]
  }
  EOF
}

# コンテナのための IAM 関連リソース (ECS で実行されるコンテナプロセスに付与される IAM role)

resource "aws_iam_role" "ecs-task-role" {
  name               = "${local.project_name}-ecs-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs-task-assume-role.json
}

resource "aws_iam_role_policy" "ecs-task-ssm-ecs-exec" {
  name = "ecs-task-ssm-ecs-exec"
  role = aws_iam_role.ecs-task-role.id

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "ssmmessages:CreateControlChannel",
          "ssmmessages:CreateDataChannel",
          "ssmmessages:OpenControlChannel",
          "ssmmessages:OpenDataChannel"
        ],
        "Effect": "Allow",
        "Resource": [
          "*"
        ]
      }
    ]
  }
  EOF
}
