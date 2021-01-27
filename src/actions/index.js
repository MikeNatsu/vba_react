import parseRequestAxio from '../apis/parseRequest'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import hljsVba from 'highlight.js/lib/vba';
// console.log(hljs)

const getInitialNodeProp = (nodeID) => {
    // move this into another file at some point
    let nodePropObj = {}
    //bunch of rules here for intiail node property
    let nodeClass = nodeID.split('-')[0]
    console.log(nodeClass)
    
    if (nodeClass == 'dqNum') {
        nodePropObj[nodeID] = {
            columns: '',
            error_flag: ''
        }
    
    }

    return nodePropObj
}

export const addNodeToFlow = (mainFlowNodes) => {
    let nodeID = Object.keys(mainFlowNodes)[0]

    let newNode = {...mainFlowNodes, ...getInitialNodeProp(nodeID)}
    return {
        type: 'ADD_NODE',
        payload: newNode
    }
}

export const modifyNodeProperty = (nodeClass, changedProps) => {
    let payload = {}
    payload[nodeClass] = changedProps

    return {
        type: 'MODIFY_NODE_PROPERTY',
        payload: payload
    }
}

export const selectNode = (nodeClass) => {
    return {
        type: 'SELECT_NODE',
        payload: nodeClass
    }
}

export const selectMenu = (topic) => {
    return {
        type: 'SELECT_MENU_OPTION',
        payload: topic
    }
}

export const parseNodeRequest = () => {
    return async (dispatch, getState) => {
        // const { userId } = getState().auth;
        let response = await parseRequestAxio.post('/nodeParse/', {'a':'a'});
        // console.log(response.data.slice(1,-1))
        console.log(response)
        // response = response.data.replace('"', '')
        // console.log(response)
        dispatch({ type: "PARSE_NODE_REQUEST", payload: response.data});
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        hljs.registerLanguage("vba", hljsVba);
      }
}

export const mouseOverProperty = (propertyType) => {
    return {
        type: "MOUSEOVER_PROPERTY",
        payload: propertyType
    }
}

export const mouseOutOfProperty = (propertyType) => {
    return {
        type: "MOUSEOUT_PROPERTY"
    }
}