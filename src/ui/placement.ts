interface Placement {
  handedness: 'left' | 'right'
}

const defaultConf : Placement = {
  handedness: 'right',
}

export function useHandedness() : Placement {
  // TODO make a user setting
  return defaultConf
}
