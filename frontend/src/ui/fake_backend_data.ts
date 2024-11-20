import { Project } from './../project'
import { Object } from './../object'

export const projects: Project[] = [
    {
      id: 1,
      name: 'project1',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      type_id: 1,
    },
    {
      id: 2,
      name: 'project2',
      description: "",
      type_id: 2,
    },
    {
      id: 3,
      name: 'project3',
      description: "",
      type_id: 1,
    },
    {
      id: 4,
      name: 'project4',
      description: "",
      type_id: 2,
    },
  ]

export const objects: Object[] = [
    {
      id: 1,
      name: 'object1',
      projectId: 1,
      regNumber: "hg12"
    },
    {
      id: 2,
      name: 'object2',
      projectId: 3,
      regNumber: "hg112"
    },
  ]