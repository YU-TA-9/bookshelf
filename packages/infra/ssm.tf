# MEMO
#   1. Terraform で ssm.tf 内に設定したい値用のパスを用意する
#     - value は "dummy" としておく
#     - type は "SecureString"
#     - overwrite は true (上書きするため)
#     - lifecycle option で ignore_changes に value を入れる
#   2. terraform apply する
#   3. aws cli から `$ aws ssm get-parameter --name '/test/sample'` のようにして追加した値が存在することを確認する
#   4. aws cli から `$ aws ssm put-parameter --type 'SecureString' --name '/test/sample' --value 'real value' --overwrite` のようにして追加したい値を設定する
#

resource "aws_ssm_parameter" "db-user-name" {
  name        = "/${local.project_name}/db-user-name"
  description = "DB user name"
  type        = "String"
  value       = var.db_user_name
}

resource "aws_ssm_parameter" "db-password" {
  name        = "/${local.project_name}/db-password"
  description = "db password"
  type        = "SecureString"
  value       = "dummy" # 後から cli で上書きする
  overwrite   = true

  lifecycle {
    ignore_changes = [
      value,
    ]
  }
}

resource "aws_ssm_parameter" "db-host" {
  name        = "/${local.project_name}/db-host"
  description = "DB host"
  type        = "String"
  value       = var.db_host
}

resource "aws_ssm_parameter" "db-port" {
  name        = "/${local.project_name}/db-port"
  description = "DB port"
  type        = "String"
  value       = var.db_port
}

// TODO: RAKUTEN APPに変えたい
resource "aws_ssm_parameter" "rakuten-api-id" {
  name        = "/${local.project_name}/rakuten-api-id"
  description = "Rakuten API ID"
  type        = "SecureString"
  value       = "dummy" # 後から cli で上書きする
  overwrite   = true

  lifecycle {
    ignore_changes = [
      value,
    ]
  }
}

resource "aws_ssm_parameter" "cookie-secret" {
  name        = "/${local.project_name}/cookie-secret"
  description = "Cookie secret key"
  type        = "SecureString"
  value       = "dummy" # 後から cli で上書きする
  overwrite   = true

  lifecycle {
    ignore_changes = [
      value,
    ]
  }
}

resource "aws_ssm_parameter" "token-secret" {
  name        = "/${local.project_name}/token-secret"
  description = "Token secret key"
  type        = "SecureString"
  value       = "dummy" # 後から cli で上書きする
  overwrite   = true

  lifecycle {
    ignore_changes = [
      value,
    ]
  }
}

resource "aws_ssm_parameter" "google-client-id" {
  name        = "/${local.project_name}/google-client-id"
  description = "Google client ID"
  type        = "SecureString"
  value       = "dummy" # 後から cli で上書きする
  overwrite   = true

  lifecycle {
    ignore_changes = [
      value,
    ]
  }
}
