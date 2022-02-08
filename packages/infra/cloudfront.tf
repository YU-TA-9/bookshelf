# data "aws_cloudfront_cache-policy" "managed-caching-optimized" {
#   name = "Managed-CachingOptimized"
# }

data "aws_cloudfront_origin_request_policy" "managed-cors-s3-origin" {
  name = "Managed-CORS-S3Origin"
}

resource "aws_cloudfront_distribution" "web-distribution" {
  origin {
    domain_name = aws_s3_bucket.web-assets.bucket_domain_name
    origin_id   = "${local.project_name}-web-assets-s3"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.web-origin-access-identity.cloudfront_access_identity_path
    }
  }

  enabled         = true
  is_ipv6_enabled = true
  comment         = "${local.project_name} web assets distribution"

  aliases = [var.domain]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.project_name}-web-assets-s3"

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true

    # cache_policy_id        = data.aws_cloudfront_cache_policy.managed-caching-optimized.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.managed-cors-s3-origin.id
  }

  # 日本が含まれる最低料金クラス
  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false

    acm_certificate_arn = aws_acm_certificate.web-cert.arn

    # CloudFrontがサポートするセキュリティポリシー。
    # デフォルトを設定
    minimum_protocol_version = "TLSv1.2_2021"

    ssl_support_method = "sni-only"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  tags = {
    Name = "web-distribution"
  }
}

resource "aws_cloudfront_origin_access_identity" "web-origin-access-identity" {
  comment = "OAI for ${local.project_name} web"
}
