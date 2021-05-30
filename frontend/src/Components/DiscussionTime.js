import { Checkbox, Row, Col, Button } from 'antd';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}



const DiscussionTime = () =>{
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ];
    return(
      <>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          <Row>
            {options.map((option, index)=>{
              return(
              <>
                <Col span={2}></Col>
                <Col span={22}>
                  <Checkbox value={option.value} style={{margin: "1%"}}>{option.label}</Checkbox>
                </Col>
                {index === options.length-1?(
                <>
                  <Col span={2}></Col>
                  <Button type="primary" htmlType="submit">
                    送出投票
                  </Button>
                </>):null}
              </>)
            })}
            
          </Row>
        </Checkbox.Group>
        
      </>
    )
}
export default DiscussionTime;
