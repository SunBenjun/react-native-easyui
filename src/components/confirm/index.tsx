import React from "react"
import { View, Text, StyleSheet,TouchableOpacity,StyleProp,ViewStyle, TextStyle } from "react-native"
import Modal from "../modal"


interface btnProps{
    text?: string;
    boxStyle?: StyleProp<ViewStyle>
    style?: StyleProp<TextStyle>
    onPress?: ()=>{}
}

interface ConfirmProps {
    visible: boolean;
    onClose?: () => void | Promise<any>;
    containerStyle?: StyleProp<ViewStyle>;
    titleBoxStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    title?: string;
    contentBoxStyle?: StyleProp<ViewStyle>;
    contentStyle?:StyleProp<TextStyle>;
    content?:string;
    footerBoxStyle?:StyleProp<ViewStyle>;
    btnBoxStyle?:StyleProp<ViewStyle>;
    btnBoxLine?:StyleProp<ViewStyle> | {};
    btnStyle?:StyleProp<TextStyle>;
    btns?: Array<btnProps>;
    selectIndex?: number;
    selectStyle?: StyleProp<TextStyle> | {};
}



export default (props: ConfirmProps) => {
    const {
        visible,  // true 显示  false 不展示 
        onClose,  // 关闭modal
        containerStyle = {}, // 弹窗整体样式比如背景 圆角
        titleBoxStyle = {}, // 标题盒子样式
        titleStyle={}, // 标题样式
        title, // 标题
        contentBoxStyle = {}, // 内容盒子样式
        contentStyle = {}, // 内容样式
        content = "暂无数据", // 内容数据
        footerBoxStyle = {}, // 底部按钮盒子样式 布局
        btns = [{ text: '确定' }], // 按钮数组
        selectIndex = 0, // 默认着色索引
        selectStyle = {}, // 默认着色
        btnBoxStyle = {}, // 按钮盒子颜色
        btnBoxLine = {}, // 按钮之前分隔线
        btnStyle = {} // 按钮色
    } = props
 

    const styles = StyleSheet.create({
        containerStyle: {
            width: 270,           
            backgroundColor:"#fff",
            borderRadius: 10,
        },
        titleBoxStyle: {
            paddingTop: 24,
            alignItems: "center"
        },
        titleStyle: {
            fontFamily: "PingFangSC-Medium",
            fontSize: 18,
            color: "#16213B"
        },
        contentBoxStyle:{
            paddingHorizontal:21,
            paddingVertical:24
        },
        contentStyle:{
            fontFamily:"PingFangSC-Regular",
            fontSize:15,
            color: "#434B61",
            lineHeight:23
        },
        footerBoxStyle:{
            height:50,
            borderTopWidth:0.5,
            borderTopColor: "#EDEDED",
            flexDirection:"row" 
        },
        btnBoxStyle:{
            flex:1,
            alignItems:"center",
            justifyContent:"center"
        },
        btnBoxLine:{
            borderLeftWidth: 0.5,
            borderLeftColor:"#EDEDED"
        },
        btnStyle:{
            fontFamily:"PingFangSC-Medium",
            fontSize:16,
            color: "#6D778B", 
        },
        selectStyle: {
            color: "#0076FF" 
        }
    })

    return (
        <Modal visible={visible} onClose={onClose}>
            <View style={[styles.containerStyle, containerStyle]}>
                {
                    !title ? null: <View style={[styles.titleBoxStyle, titleBoxStyle]}><Text style={[styles.titleStyle, titleStyle]}>{title}</Text></View>
                }
                
                <View style={[styles.contentBoxStyle,contentBoxStyle]}><Text style={[styles.contentStyle,contentStyle]}>{content}</Text></View>
                <View style={[styles.footerBoxStyle, footerBoxStyle]}>
 
                    {
                        btns.map((btn:btnProps, i:number) => {
                            const { text, boxStyle, style, onPress} = btn
                            return (
                                <TouchableOpacity key={`btn-${i}`} activeOpacity={1} style={[
                                    styles.btnBoxStyle, 
                                    i!==0 && {...styles.btnBoxLine,...btnBoxLine},  
                                    btnBoxStyle,
                                    boxStyle, 
                                ]} onPress={()=>{                                
                                    onPress ? onPress() : onClose()
                                }}>
                                    <Text style={[
                                        styles.btnStyle,
                                        selectIndex === i &&  {...styles.selectStyle, ...selectStyle},
                                        btnStyle, style]}>
                                        {text}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    } 
                </View>
            </View>
        </Modal>
    )
}
 