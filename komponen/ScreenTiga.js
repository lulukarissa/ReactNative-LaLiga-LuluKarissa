import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Icon,
  Item, Input, Content, Footer, Button, Text, Card, CardItem, Thumbnail} from 'native-base'
import {Alert, Image} from 'react-native'
import axios from 'axios'

export default class App extends Component{
  static navigationOptions = ({navigation}) => {
    return{
      title: navigation.getParam('nama'),
      headerStyle: {
        backgroundColor: 'purple'
      },
      headerTintColor: 'white',
    }
  }

  state = {
    player: ''
  }

  componentDidMount(){
    var id = this.props.navigation.getParam('idplayer')
    var url = `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${id}`
    
    axios.get(url)
    .then((x)=>{
      if(x.data.players){
        this.setState({
          player: x.data.players[0]
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
      var nama = this.state.player.strPlayer
      var negara = this.state.player.strNationality
      var deskripsi = this.state.player.strDescriptionEN
      var foto = this.state.player.strThumb
      var foto2 = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

    return (
      <Container>
        <Content style={{marginTop: 10}}>
        <Card>
            <CardItem>
              <Left>
                <Thumbnail source={foto ? {uri: foto} : {uri: foto2}} />
                <Body>
                  <Text>{nama}</Text>
                  <Text note>{negara}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={foto ? {uri: foto} : {uri: foto2}} style={{height: 380, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text>{deskripsi}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}