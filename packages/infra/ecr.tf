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
            "description": "Expire images more than 1 in untagged",
            "selection": {
                "tagStatus": "untagged",
                "countType": "imageCountMoreThan",
                "countNumber": 1
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
