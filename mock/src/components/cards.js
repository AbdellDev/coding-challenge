import React from 'react'
import {Card,Image,Label} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {DateTime} from 'luxon'

const Items =({repos,currentdate})=>{
  const itemslist=repos.map(repo=>{
    return(
    <Card fluid>
     <Card.Content>
       <Image floated='left' size='mini' src={repo.owner.avatar_url} />
       <Card.Header>{repo.name}</Card.Header>
       <Card.Description>
         {repo.description}
       </Card.Description>
     </Card.Content>
     <Card.Content extra>
       <div>
       <Label>
        Stars
          <Label.Detail>{repo.watchers}</Label.Detail>
       </Label>
       <Label>
        Issues
          <Label.Detail>{repo.open_issues}</Label.Detail>
       </Label>
       <Label>
         <Card.Meta>Submitted {
             currentdate.diff(DateTime.fromISO(repo.created_at),'days').toFormat("d")
           } days ago by {repo.owner.login}</Card.Meta>
       </Label>
       </div>
     </Card.Content>
   </Card>
 )})
 return(
   <div>
    <Card.Group>{itemslist}</Card.Group>
   </div>
 )
}

export default Items;
