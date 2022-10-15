interface Placement {
  handedness: 'left' | 'right'
}

const defaultConf : Placement = {
  handedness: 'right',
}

export function useHandedness() {
  // TODO make a user setting
  return defaultConf
}
