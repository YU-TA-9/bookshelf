resource "aws_ecr_repository" "api" {
  name = "${local.project_name}-api-repository"
}

resource "aws_ecr_lifecycle_policy" "api-policy" {
  repository = aws_ecr_repository.api.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Expire images older than 5 days",
            "selection": {
                "tagStatus": "untagged",
                "countType": "sinceImagePushed",
                "countUnit": "days",
                "countNumber": 5
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
