resource "aws_lb" "api-lb" {
  name               = "${local.project_name}-api-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.public-lb.id]
  subnets            = aws_subnet.public-subnet.*.id

  enable_deletion_protection = true

  # TODO: ログを取るか検討
  # access_logs {
  #   bucket  = aws_s3_bucket.lb-log.bucket
  #   prefix  = "${local.project_name}-api-lb"
  #   enabled = true
  # }
}

resource "aws_lb_target_group" "api-lb-tg" {
  name = "${local.project_name}-api-ecs-target-group"

  vpc_id = aws_vpc.vpc.id

  port                 = 3000
  protocol             = "HTTP"
  target_type          = "ip"
  deregistration_delay = 10

  health_check {
    port              = 3000
    path              = "/healthz" # 要調整
    interval          = 10
    healthy_threshold = 2
  }
}

resource "aws_lb_listener" "api-https" {
  load_balancer_arn = aws_lb.api-lb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.api-cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api-lb-tg.arn
  }
}

resource "aws_lb_listener" "api-redirect-http-to-https" {
  load_balancer_arn = aws_lb.api-lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
