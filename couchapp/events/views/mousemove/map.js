function(doc) {
    if(doc.event.type === "mousemove"){
        emit([ doc.dateCreated, doc.event.type ], [doc.dateCreated, doc.event] );
    }
}