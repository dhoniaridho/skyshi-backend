function findFirstOccurance(str: string) {
  const matches = str.split('"')
  return matches[1] ? matches[1] : str
}

export function mapError(errors: string) {
  return errors.split('. ').map((error: string) => {
    return findFirstOccurance(error)
  })
}
