import * as React from 'react'
import {
  ReferenceInput,
  TextInput,
  TabbedForm,
  FormTab,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  DisabledInput
} from 'react-admin'

const parsePath = models => el => {
  if (el.type === 'String') {
    return (
      <TextInput label={el.label} source={el.name} required={el.required} />
    )
  }
  if (el.type === 'Date') {
    return (
      <TextInput label={el.label} source={el.name} required={el.required} />
    )
  }
  if (el.type === 'ObjectId') {
    return (
      <DisabledInput label={el.label} source={el.name} required={el.required} />
    )
  }
  if (el.type === 'Number') {
    return (
      <TextInput label={el.label} source={el.name} required={el.required} />
    )
  }
  if (el.type === 'Ref') {
    return (
      <ReferenceInput label={el.label} source={el.name} reference={el.to}>
        <SelectInput optionText={models.find(model => model.name === el.to).label} />
      </ReferenceInput>
    )
  }
  if (el.type === 'Array') {
    return (
      <ArrayInput label={el.label} source={el.name}>
        <SimpleFormIterator>
          {el.children.map(parsePath(models))}
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  if (el.type === 'ArrayRef') {
    return (
      <ArrayInput label={el.label} source={el.name} defaultValue=''>
        <SimpleFormIterator>
          <ReferenceInput reference={el.to}>
            <SelectInput
              optionText={models.find(model => model.name === el.to).label}
            />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  if (el.type.startsWith('Array')) {
    return (
      <ArrayInput
        label={el.label}
        source={el.name}
        required={el.required}
        defaultValue={{ hey: 3 }}
      >
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
    )
  }
  return null
}
const parsePathPrefix = (models, prefix) => (el, key) => {
  return parsePath(models)({
    ...el,
    name: `${prefix}.${el.name}`,
    label: el.name
  })
}
function parseComplex (models, name, children, isArray = false) {
  if (name !== 'General') {
    return (
      <FormTab key={name} label={name}>
        {children.map(parsePathPrefix(models, name))}
      </FormTab>
    )
  }
  return (
    <FormTab key={0} label={name}>
      {children.map(parsePath(models))}
    </FormTab>
  )
}
export default function PostCreate (models, model, showId = false) {
  return (
    <TabbedForm>
      {parseComplex(
        models,
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
        .map(el =>
          parseComplex(models, el.name, el.children, el.type === 'Array')
        )}
    </TabbedForm>
  )
}
