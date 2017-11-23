function WriteToFile(passForm) {
    set fso = CreateObject("Scripting.FileSystemObject");
    set s = fso.CreateTextFile("./test.txt", True);
    s.writeline("HI");
    s.writeline("Bye");
    s.writeline("-----------------------------");
    s.Close();
 }
