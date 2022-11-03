export function mapError(errors: string) {
  return errors.split('. ').map((error) => {
    return error.replace(/['"]+/g, '')
  })
}
