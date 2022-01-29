# terraformの仕様
data "aws_elb_hosted_zone_id" "main" {}

# terraformの仕様、hosted-zoneを検索できる
data "aws_route53_zone" "hosted-zone" {
  name         = "yu-ta-9.com." # TODO: 定義の仕方要検討
  private_zone = false
}

resource "aws_route53_record" "api-record" {
  zone_id = data.aws_route53_zone.hosted-zone.id
  name    = "api.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_lb.api-lb.dns_name
    zone_id                = data.aws_elb_hosted_zone_id.main.id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "web-record" {
  zone_id = data.aws_route53_zone.hosted-zone.id
  name    = var.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.web-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.web-distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "api-cert-validation" {
  for_each = {
    for dvo in aws_acm_certificate.api-cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id = data.aws_route53_zone.hosted-zone.zone_id
  ttl     = 60
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
}

resource "aws_route53_record" "web-cert-validation" {
  for_each = {
    for dvo in aws_acm_certificate.web-cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id = data.aws_route53_zone.hosted-zone.zone_id
  ttl     = 60
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
}
