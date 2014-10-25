function(doc) {
    if(doc.event === "disconnect"){
        emit([ doc.dateCreated, doc.event.type ], [doc.dateCreated, doc.event] );
    }
}