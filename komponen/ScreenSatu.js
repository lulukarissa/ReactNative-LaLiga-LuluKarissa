import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Icon,
  Item, Input, Content, Footer, Button, Text, List, ListItem, Thumbnail} from 'native-base'
import {Alert} from 'react-native'
import axios from 'axios'

export default class App extends Component{
  static navigationOptions = {
    title: 'La Liga Teams',
      headerStyle: {
        backgroundColor: 'purple'
      },
      headerTintColor: 'white'
  }
  state = {
    allteams: []
  }

  componentDidMount(){
    var url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Spain'
    
    axios.get(url)
    .then((x)=>{
      if(x.data.teams){
        this.setState({
          allteams: x.data.teams
        })
      }
      else{
        Alert.alert('Data tidak tersedia!')
      }
    })
    .catch((x)=>{
      Alert.alert('error')
    })
  }

  render() {
    var dataTeams = this.state.allteams.map((val,i)=>{
      var nama = val.strTeam
      var website = val.strWebsite
      var logo = val.strTeamBadge
      var logo2 = 'https://2.bp.blogspot.com/-JWubzCSVqiM/WTPtYlIt-bI/AAAAAAAACQY/BK6p7OUCw_YeGDq7yGrTMTZIyMLu9h5JACLcB/s1600/a43AkSCVQy69zUaU7ADq_%25E9%2597%25AE%25E5%258F%25B7%25E5%25B0%258F%25E7%25BB%2584logo.png'
      var id = val.idTeam

      return(
        <ListItem key={i} thumbnail
        onPress={()=>{
          this.props.navigation.navigate('HalDua',{
            idteam: id,
            team: nama
          })
        }}>
          <Left>
            <Thumbnail square source= {logo ? {uri: logo} : {uri: logo2}}/>
          </Left>
          <Body>
            <Text>{nama}</Text>
            <Text note>{website}</Text>
          </Body>
        </ListItem>
      )
    })
    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <List>{dataTeams}</List>
        </Content>
      </Container>
    );
  }
}