
  resource "aws_lambda_function" "projectName" {
  function_name = "HelloWorld"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_projectName.key

  runtime = "runtimeName"
  handler = "index.handler"

  source_code_hash = data.archive_file.lambda_projectName.output_base64sha256
}