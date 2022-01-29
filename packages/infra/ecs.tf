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

  cpu = 256
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
