#
# ACM
#

resource "aws_acm_certificate" "api-cert" {
  domain_name       = aws_route53_record.api-record.name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "web-cert" {
  domain_name = var.domain
  validation_method = "DNS"

  # Distributionから使用する場合us-east-1に設置しないといけない
  provider = aws.virginia

  lifecycle {
    create_before_destroy = true
  }
}

#
# ACM DNS validation
#

resource "aws_acm_certificate_validation" "api-cert-validation" {
  certificate_arn         = aws_acm_certificate.api-cert.arn
  validation_record_fqdns = [for record in aws_route53_record.api-cert-validation : record.fqdn]
}

resource "aws_acm_certificate_validation" "web-cert-validation" {
  certificate_arn         = aws_acm_certificate.web-cert.arn
  validation_record_fqdns = [for record in aws_route53_record.web-cert-validation : record.fqdn]

  provider = aws.virginia
}
