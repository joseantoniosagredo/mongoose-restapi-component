import React from 'react'
import ModelForm from './ModelForm'
import { Create, TabbedForm } from 'react-admin'
export default function PostCreate (model) {
  const {General, OtherTabs} = ModelForm(model)
  const CreateForm = props => (
    <Create {...props}>
      <TabbedForm>
        <General />
      </TabbedForm>
    </Create>
  )
  return CreateForm
}
