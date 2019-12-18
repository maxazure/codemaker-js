<script>
const
  cpmponentTypes = [{
    value: 'dragInput',
    label: '文本输入框'
  }, {
    value: 'dragTextarea',
    label: '文本域输入框'
  }, {
    value: 'dragSelect',
    label: '下拉框'
  }, {
    value: 'dragRadio',
    label: '单选框'
  }, {
    value: 'dragCheckbox',
    label: '多选框'
  }, {
    value: 'dragNumber',
    label: '计数器'
  }, {
    value: 'dragDatepicker',
    label: '日期选择'
  }
  ];
const fieldTypes = [
  { value: 'string', label: 'string' },
  { value: 'integer', label: 'integer' },
  {
    value: 'boolean',
    label: 'boolean'
  },
  { value: 'date', label: 'date' }];

export default {
  cpmponentTypes, fieldTypes
}

</script>
