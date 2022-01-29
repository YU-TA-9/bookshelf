variable "availability_zones" {
  default = ["ap-northeast-1a", "ap-northeast-1c"]
}

data "aws_region" "current" {}

# vpc

resource "aws_vpc" "vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "${local.project_name}-vpc"
  } 
}

# subnet

# API用
resource "aws_subnet" "public-subnet" {
  vpc_id = aws_vpc.vpc.id
  count  = length(var.availability_zones)

  cidr_block              = cidrsubnet(aws_vpc.vpc.cidr_block, 8, 1 + count.index)
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = true

  tags = {
    Name = "${local.project_name}-public-subnet-${count.index}"
  }
}

# DB用
resource "aws_subnet" "private-subnet" {
  vpc_id = aws_vpc.vpc.id
  count = length(var.availability_zones)

  cidr_block =  cidrsubnet(aws_vpc.vpc.cidr_block, 8, 21 + count.index)
  map_public_ip_on_launch = true

  tags = {
    Name =  "${local.project_name}-private-subnet-${count.index}"
  }
}

# internet gateway

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
}

# route table

resource "aws_route_table" "route-table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${local.project_name}-route-table"
  } 
}

# route table association

resource "aws_route_table_association" "route-table-association" {
  count = length(var.availability_zones)

  route_table_id = aws_route_table.route-table.id
  subnet_id      = aws_subnet.public-subnet[count.index].id
}

# TODO: vpc endpoint and its route association for s3
