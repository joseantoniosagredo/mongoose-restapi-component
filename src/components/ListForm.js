import React from 'react'
import {
  List,
  Datagrid,
  EditButton,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField,
  ReferenceArrayField,
  TextField
} from 'react-admin'

function parsePath (el, key) {
  if (el.type === 'String') {
    console.log('textfield'+ el.name)
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
        <TextField source={'name'} />
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
      <ReferenceArrayField label={el.name} key={key} source={el.name} reference={el.to}>
        <SingleFieldList>
          <ChipField source={'name'} />
        </SingleFieldList>
      </ReferenceArrayField>
    )
  }
  return null
}
function parseComplex (name, children, isArray = false) {
  return children.map(parsePath)
}
export default function PostCreate (model) {
  const ListForm = props => (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        {model.paths.filter(path=>{
          return path.name !== '_id' && path.name !== '__v'
        }).map(parsePath)}
        <EditButton />
      </Datagrid>
    </List>
  )
  return ListForm
}
