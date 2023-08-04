package com.ssafy.tati.exception;

import java.io.IOException;

public class FileDownloadFailedException extends IOException {
    public FileDownloadFailedException(String message){super(message);}
}
