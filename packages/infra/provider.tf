provider "aws" {
  region = "ap-north-east-1"
}

provider "aws" {
  alias = "virginia"
  region = "us-east-1"
}