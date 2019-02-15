import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Icon,
  Item, Input, Content, Footer, Button, Text, List, ListItem, Thumbnail} from 'native-base'
import {Alert} from 'react-native'
import axios from 'axios'

export default class App extends Component{
  static navigationOptions = ({navigation}) => {
    return{
      title: navigation.getParam('team'),
      headerStyle: {
        backgroundColor: 'purple'
      },
      headerTintColor: 'white',
    }
  }

  state = {
    players: []
  }

  componentDidMount(){
    var id = this.props.navigation.getParam('idteam')
    var url = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${id}`
    
    axios.get(url)
    .then((x)=>{
      if(x.data.player){
        this.setState({
          players: x.data.player
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
    var dataPlayers = this.state.players.map((val,i)=>{
      var nama = val.strPlayer
      var posisi = val.strPosition
      var foto = val.strThumb
      var foto2 = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      var id = val.idPlayer

      return(
        <ListItem key={i} avatar
        onPress={()=>{
          this.props.navigation.navigate('HalTiga',{
            idplayer: this.props.navigation.getParam('idteam'),
            nama: nama,
            idplayer: id
          })
        }}>
          <Left>
            <Thumbnail source= {foto ? {uri: foto} : {uri: foto2}}/>
          </Left>
          <Body>
            <Text>{nama}</Text>
            <Text note>{posisi}</Text>
          </Body>
        </ListItem>
      )
    })
    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <List>{dataPlayers}</List>
        </Content>
      </Container>
    );
  }
}