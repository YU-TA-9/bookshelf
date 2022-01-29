data "aws_caller_identity" "current" {}

variable "aws_github_actions_user" {
}

variable "domain" {
}

variable "vpc_cidr" {
}

variable "db_user_name" {
}

variable "db_host" {
}

variable "db_port" {
}

locals {
  project_name = "bookshelf"
}
