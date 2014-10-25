function(doc) {
    if(doc.ip){
        emit([ doc.dateCreated, doc.ip ], doc);
    }
}