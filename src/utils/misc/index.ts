/**
 * [isEmpty description]
 *
 * @param  {object}  incoming [description]
 *
 * @return {boolean}
 */
function isEmpty(incoming: object) : boolean {
  return (
    incoming === undefined
    || incoming === null
    || Object.keys(incoming).length === 0
  )
}

export { isEmpty }
