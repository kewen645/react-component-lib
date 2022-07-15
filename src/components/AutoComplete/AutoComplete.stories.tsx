import { AutoComplete, DataSourceType } from './AutoComplete'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

// interface EmployeeProps {
//   id?: string
//   value: string
// }

interface GitHubUserProps {
  login: string
  url: string
  avatar_url: string
}

export default {
  title: 'AutoComplete',
  component: AutoComplete,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        component: 'AutoComplete for query',
      },
    },
  },
} as ComponentMeta<typeof AutoComplete>

// const employees = ['david', 'rose', 'tom']

// const employeesObj = [
//   { id: '1', value: 'tom' },
//   { id: '2', value: 'jack' },
//   { id: '3', value: 'mike' },
//   { id: '4', value: 'mary' },
// ]

// const handleFetch = (query: string) => {
//   return employees.filter((name) => name.includes(query)).map((name) => ({ value: name }))
// }

// const handleFetch = (query: string) => {
//   return employeesObj.filter((item) => {
//     return item.value.includes(query)
//   })
// }

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items)
      const formatItems = items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      return formatItems
    })
}

const renderOption = (item: DataSourceType) => {
  const itemFromGitHub = item as DataSourceType<GitHubUserProps>
  return (
    <>
      <h2>{itemFromGitHub.value}</h2>
      {/* <p>URL: {itemFromGitHub.url}</p> */}
      {/* <p>AVATAR_URL: {itemFromGitHub.avatar_url}</p> */}
    </>
  )
}

export const simpleComplete: ComponentStory<typeof AutoComplete> = () => (
  <AutoComplete
    fetchSuggestion={handleFetch}
    onSelect={action('selected')}
    renderOption={renderOption}
  />
)
