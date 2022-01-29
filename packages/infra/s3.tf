
# WEB assets 配信用

resource "aws_s3_bucket" "web-assets" {
  bucket = "${local.project_name}-web-assets"
  acl = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

resource "aws_bucket_policy" "web-assets-bucket_policy" {
  bucket = aws_s3_bucket.web-assets.bucket
  policy = data.aws_iam_policy_document.web-assets-bucket-policy-document.json
}

resource "aws_iam_policy_document" "web-assets-bucket-policy-document" {
  statement {
    sid = "AllowReadAccessFromCloudFront"
    effect = "Allow"
    principals {
      type = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.web-origin_access_identity.iam_arn]
    }
    actions = [
      "s3:GetObject",
    ]
    resources = ["${aws_s3_bucket.web-assets.arn}/*"]
  }

  statement {
    sid    = "AllowPutByDeployUser"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:user/${var.aws_github_actions_user}"]
    }
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
    ]
    resources = [
      aws_s3_bucket.web-assets.arn,
      "${aws_s3_bucket.web-assets.arn}/*",
    ]
  }

  statement {
    sid    = "AllowDeployUserToListBucket"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${var.aws_account_id}:user/${var.aws_github_actions_user}"]
    }
    actions = [
      "s3:ListBucket",
    ]
    resources = [
      aws_s3_bucket.web-assets.arn,
    ]
  }
}