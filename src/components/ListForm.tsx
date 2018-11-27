import * as React from 'react'
import {
  List,
  Datagrid,
  EditButton,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField,
  ReferenceArrayField,
  FunctionField,
  TextField
} from 'react-admin'
import { Filter, TextInput } from 'react-admin'

const parsePath = models => (el, key) => {
  if (el.type === 'String') {
    return <TextField key={key} source={el.name} />
  }
  if (el.type === 'Date') {
    return <TextField key={key} source={el.name} />
  }
  if (el.type === 'ObjectId') {
    return <TextField key={key} source={el.name} />
  }
  if (el.type === 'Number') {
    return <TextField key={key} source={el.name} />
  }
  if (el.type === 'Ref') {
    return (
      <ReferenceField key={key} source={el.name} reference={el.to}>
        <TextField source={models.find(model => model.name === el.to).label} />
      </ReferenceField>
    )
  }
  if (el.type === 'Array') {
    return (
      <ArrayField key={key} source={el.name}>
        <SingleFieldList>
          <ChipField source={el.label} />
        </SingleFieldList>
      </ArrayField>
    )
  }
  if (el.type === 'ArrayRef') {
    return (
      <ReferenceArrayField
        label={el.name}
        key={key}
        source={el.name}
        reference={el.to}
      >
        <SingleFieldList>
          <ChipField source={models.find(model => model.name === el.to).label} />
        </SingleFieldList>
      </ReferenceArrayField>
    )
  }
  if (el.type && el.type.startsWith('Array')) {
    const CursorComponent: any = ({ record }) => {
      return (
        <ul>
          {record[el.name] &&
            record[el.name].map(child => (
              <li key={child}>{child.toString()}</li>
            ))}
        </ul>
      )
    }
    CursorComponent.defaultProps = { addLabel: true }
    return <CursorComponent key={key} />
  }
  if (!el.complex) {
    return (
      <FunctionField
        key={key}
        label={el.name}
        render={record => (record[el.name] ? record[el.name].toString() : '')}
      />
    )
  }
}

const ListFilter = props => (
  <Filter {...props}>
    <TextInput label='Search' source='$any' alwaysOn />
  </Filter>
)
export default function PostCreate(models, model) {
  const ListForm = props => (
    <List {...props} filters={<ListFilter />}>
      <Datagrid>
        {model.paths
          .filter(path => {
            return path.name !== '_id' && path.name !== '__v'
          })
          .map(parsePath(models))}
        <EditButton />
      </Datagrid>
    </List>
  )
  return ListForm
}
