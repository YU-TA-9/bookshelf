resource "aws_db_subnet_group" "rds-subnet-group" {
  name       = "rds-subnet-group"
  subnet_ids = aws_subnet.private-subnet.*.id
}

resource "aws_db_parameter_group" "rds-parameter-group" {
  name_prefix = "${local.project_name}-"
  description = "RDS for MySQL"
  family      = "mysql8.0"

  parameter {
    apply_method = "immediate"
    name         = "character_set_server"
    value        = "utf8mb4"
  }

  parameter {
    apply_method = "immediate"
    name         = "collation_connection"
    value        = "utf8mb4_bin"
  }

  parameter {
    apply_method = "immediate"
    name         = "collation_server"
    value        = "utf8mb4_bin"
  }

  parameter {
    apply_method = "immediate"
    name         = "innodb_print_all_deadlocks"
    value        = 1
  }

  parameter {
    apply_method = "pending-reboot"
    name         = "innodb_rollback_on_timeout"
    value        = 1
  }

  parameter {
    apply_method = "immediate"
    name         = "long_query_time"
    value        = 0.2
  }

  parameter {
    apply_method = "immediate"
    name         = "max_connections"
    value        = 1000
  }

  parameter {
    apply_method = "immediate"
    name         = "max_connect_errors"
    value        = 999999999
  }

  parameter {
    apply_method = "pending-reboot"
    name         = "performance_schema"
    value        = 1
  }

  parameter {
    apply_method = "pending-reboot"
    name         = "skip-character-set-client-handshake"
    value        = 1
  }

  parameter {
    apply_method = "immediate"
    name         = "slow_query_log"
    value        = 1
  }

  parameter {
    apply_method = "immediate"
    name         = "sql_mode"
    value        = "traditional"
  }

  tags = {
    Name = "${local.project_name}-rds-parameter-group"
  }
}

resource "random_string" "final_snapshot_identifier_suffix" {
  length  = 12
  upper   = false
  number  = false
  special = false
}

resource "aws_db_instance" "rds-instance" {
  identifier_prefix      = "${local.project_name}-"
  parameter_group_name   = aws_db_parameter_group.rds-parameter-group.name
  db_subnet_group_name   = aws_db_subnet_group.rds-subnet-group.name
  vpc_security_group_ids = [aws_security_group.rds-sg.id]

  engine = "mysql"
  # see https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt
  engine_version = "8.0.23"
  instance_class = "db.t3.micro"

  username = "root"
  password = "password" # 後で変える

  multi_az = false

  storage_type      = "gp2"
  allocated_storage = 20
  storage_encrypted = true

  backup_retention_period      = 1 # 課金されるので調整
  apply_immediately            = true
  allow_major_version_upgrade  = false
  auto_minor_version_upgrade   = false
  copy_tags_to_snapshot        = true
  monitoring_interval          = 0     # 要調整、拡張モニタリング設定
  monitoring_role_arn          = null  # 要調整、拡張モニタリングを使う場合は指定する
  skip_final_snapshot          = false # falseの場合、final_snapshot_identifierの指定必須
  final_snapshot_identifier    = "${local.project_name}-${random_string.final_snapshot_identifier_suffix.result}"
  maintenance_window           = "sun:16:30-sun:17:30" // JSTでmon 01:30-02:30
  performance_insights_enabled = false                 # MEMO: インスタンスクラスによって可否が変わるので有効にする際は調査する
  deletion_protection          = true                  # 要調整

  tags = {
    Name = "${local.project_name}-rds"
  }
}

# RDS monitoring のための IAM 関連リソース

# MEMO: 拡張モニタリングを使うときにコメントを外す

# resource "aws_iam_role" "rds-monitoring-role" {
#   name               = "${local.project_name}-rds-monitoring-role"
#   assume_role_policy = data.aws_iam_policy_document.rds-monitoring-assume-role.json
# }

# data "aws_iam_policy_document" "rds-monitoring-assume-role" {
#   statement {
#     actions = ["sts:AssumeRole"]

#     principals {
#       type        = "Service"
#       identifiers = ["monitoring.rds.amazonaws.com"]
#     }
#   }
# }

# resource "aws_iam_role_policy_attachment" "rds-monitoring-policy-attachment" {
#   role       = aws_iam_role.rds-monitoring-role.name
#   policy_arn = data.aws_iam_policy.rds-enhanced-monitoring-role.arn
# }

# data "aws_iam_policy" "rds-enhanced-monitoring-role" {
#   arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
# }

