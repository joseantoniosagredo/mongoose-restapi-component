import * as React from 'react'
import ModelForm from './ModelForm'
import { Create } from 'react-admin'
export default function PostCreate (models, model) {
  const CreateForm = props => (
    <Create {...props}>
        {ModelForm(models, model)}
    </Create>
  )
  return CreateForm
}
