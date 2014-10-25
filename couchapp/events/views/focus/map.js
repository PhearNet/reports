function(doc) {
    if(doc.event.type === "focus"){
        emit([ doc.dateCreated, doc.event.type ], [doc.dateCreated, doc.event] );
    }
}