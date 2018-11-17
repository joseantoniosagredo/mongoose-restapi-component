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
    return <TextInput label={el.label} source={el.name} required={el.required} />
  }
  if (el.type === 'Date') {
    return <TextInput label={el.label} source={el.name} required={el.required} />
  }
  if (el.type === 'ObjectId') {
    return <DisabledInput label={el.label} source={el.name} required={el.required} />
  }
  if (el.type === 'Number') {
    return <TextInput label={el.label} source={el.name} required={el.required} />
  }
  if (el.type === 'Ref') {
    return (
      <ReferenceInput label={el.label} source={el.name} reference={el.to}>
        <SelectInput optionText={'name'} />
      </ReferenceInput>
    )
  }
  if (el.type === 'Array') {
    return (
      <ArrayInput label={el.label} source={el.name}>
        <SimpleFormIterator>
          {el.children.map(parsePath)}
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  if (el.type === 'ArrayRef') {
    return (
      <ArrayInput label={el.label} source={el.name}>
        <SimpleFormIterator>
          <ReferenceInput reference={el.to}>
            <SelectInput optionText={'name'} />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  if (el.type.startsWith('Array')) {
    const type = el.type.slice('Array'.length)
    return (
      <ArrayInput label={el.label} source={el.name} required={el.required}>
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  return null
}
const parsePathPrefix = prefix => (el, key) => {
  return parsePath({ ...el, name: `${prefix}.${el.name}`, label: el.name })
}
function parseComplex (name, children, isArray = false) {
  if (name !== 'General') {
    return (
      <FormTab label={name}>
        {children.map(parsePathPrefix(name))}
      </FormTab>
    )
  }
  return (
    <FormTab label={name}>
      {children.map(parsePath)}
    </FormTab>
  )
}
export default function PostCreate (model, showId = false) {
  return (
    <TabbedForm>
      {parseComplex(
        'General',
        model.paths.filter(
          path =>
            !(path.hasOwnProperty('children') &&
              path.type !== 'Array' &&
              (!showId || path.name !== '_id'))
        )
      )}
      {model.paths
        .filter(
          path => path.hasOwnProperty('children') && path.type !== 'Array'
        )
        .map(el => parseComplex(el.name, el.children, el.type === 'Array'))}
    </TabbedForm>
  )
}
