import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super()
            this.state={
              hasCameraPermissions:null,
              scanned:false,
              scannedData:'',
              buttonState:'normal',
            }
        
    }

    getCameraPermissions=async(id)=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
          hasCameraPermissions:status=='granted',
          buttonState:id,
          buttonState:'clicked'
      })
    }

    handleBarcodeScanner=async({type,data})=>{
      this.setState({
          scanned:true,
          scannedData:data,
          buttonState:'normal'
      })
    }

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState == 'clicked' && hasCameraPermissions){
            return (
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.state.handleBarcodeScanner}
                />
            )
        }else if(buttonState=='normal'){
        return(
        <View style={styles.container}>
            <View>
            <Image
          style={{width:200,height:200}}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
          }}
        />
                <Text style={{fontSize:30,fontWeight:'bold',textAlign:'center'}}>Barcode Scanner</Text>
            </View>
       

         <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}
         onPress={()=>{
             this.getCameraPermissions()
         }} >
          <Text style={styles.scanText}>Scan</Text>
         </TouchableOpacity>
        </View>
        )
    }
    }}

    const styles = StyleSheet.create({
        container:{
            justifyContent:'center',
            alignItems:'center'
        },
        inputView:{
        flexDirection:'row',
        margin:20,
        },
        scanButton:{
        backgroundColor:'green',
        padding:10,
        margin:10,
        width:50,
        },
        scanText:{
            fontSize:20,
            textDecorationLine:'underline',
        },
        inputBox:{
            borderWidth:1,
            width:200,
            height:50,
            fontSize:20,
        }
        
    })