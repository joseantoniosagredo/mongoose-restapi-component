import React from 'react'
import {
  Edit,
  SimpleForm,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ReferenceInput,
  TextInput,
  TabbedForm,
  FormTab,
  LongTextInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  DisabledInput
} from 'react-admin'

function parsePath (el) {
  if (el.type === 'String') {
    return <TextInput source={el.name} required={el.required} />
  }
  if (el.type === 'Date') {
    return <TextInput source={el.name} required={el.required} />
  }
  if (el.type === 'ObjectId') {
    return <DisabledInput source={el.name} required={el.required} />
  }
  if (el.type === 'Number') {
    return <TextInput source={el.name} required={el.required} />
  }
  if (el.type === 'Ref') {
    return (
      <ReferenceInput source={el.name} reference={el.to}>
        <SelectInput optionText={'name'} />
      </ReferenceInput>
    )
  }
  if (el.type === 'Array') {
    return (
      <ArrayInput source={el.name}>
        <SimpleFormIterator>
          {el.children.map(parsePath)}
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  if (el.type === 'ArrayRef') {
    return (
      <ArrayInput source={el.name}>
        <SimpleFormIterator>
          <ReferenceInput source={el.name} reference={el.to}>
            <SelectInput optionText={'name'} />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  return null
}
function parseComplex (name, children, isArray = false) {
  return (
    <FormTab label={name}>
      {children.map(parsePath)}
    </FormTab>
  )
}
export default function PostCreate (model) {
  const General = props =>
    parseComplex(
      'General',
      model.paths.filter(
        path => !(path.hasOwnProperty('children') && path.type !== 'Array')
      )
    )
  const OtherTabs = props =>
    model.paths
      .filter(path => path.hasOwnProperty('children') && path.type !== 'Array')
      .map(el => parseComplex(el.name, el.children, el.type === 'Array'))

  return {
    General,
    OtherTabs
  }
}
