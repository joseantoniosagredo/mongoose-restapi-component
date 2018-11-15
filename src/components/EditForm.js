import React from 'react'
import ModelForm from './ModelForm'
import { Edit, TabbedForm } from 'react-admin'

export default function PostCreate (model) {
  const CreateForm = props => (
    <Edit {...props}>
        { ModelForm(model)}
    </Edit>
  )
  return CreateForm
}
