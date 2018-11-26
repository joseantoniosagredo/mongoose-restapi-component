import React from 'react'
import ModelForm from './ModelForm'
import { Create } from 'react-admin'
export default function PostCreate (model) {
  const CreateForm = props => (
    <Create {...props}>
        {ModelForm(model)}
    </Create>
  )
  return CreateForm
}
