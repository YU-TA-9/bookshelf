terraform {
  backend "remote" {
    organization = "YU-TA-9"
    workspaces {
      name = "infra"
    }
  }
}
