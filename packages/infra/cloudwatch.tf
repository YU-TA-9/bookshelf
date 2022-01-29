resource "aws_cloudwatch_log_group" "ecs-api" {
  name              = "${local.project_name}/ecs/api/"
  retention_in_days = 7 # 要調整
}
