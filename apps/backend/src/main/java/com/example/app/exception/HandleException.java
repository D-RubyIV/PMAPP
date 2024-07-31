package com.example.app.exception;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class HandleException {
    @ExceptionHandler(ApiException.class)
    public final ResponseEntity<ErrorModel> handleApiException(ApiException ex) {
        ErrorModel errorModel = new ErrorModel(ex.getMessage(), ex.getHttpStatus(), ex.getErrors());
        return ResponseEntity.status(ex.getHttpStatus().value()).body(errorModel);
    }

    @ExceptionHandler(CredentialsExpiredException.class)
    public final ResponseEntity<ErrorModel> handleCredentialsExpiredException(CredentialsExpiredException ex) {
        ErrorModel errorModel = new ErrorModel(ex.getMessage(), HttpStatus.FORBIDDEN, new ArrayList<>());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorModel);
    }


    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ErrorModel> handleBadRequestsException(BadRequestException ex) {
        ErrorModel errorModel = new ErrorModel(ex.getMessage(), HttpStatus.BAD_REQUEST, new ArrayList<>());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorModel);
    }

    @ExceptionHandler(BindException.class)
    public final ResponseEntity<?> handleBindException(BindException ex) {
        String field = ex.getFieldErrors().get(0).getField();
        String defaultMessage = ex.getFieldErrors().get(0).getDefaultMessage();
        ErrorModel errorModel = new ErrorModel(field.substring(0, 1).toUpperCase() + field.substring(1) + " " + defaultMessage, HttpStatus.BAD_REQUEST, new ArrayList<>());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorModel);
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleSecurityException(Exception exception) {
        ProblemDetail errorDetail = null;
        exception.printStackTrace();

        if (exception instanceof BadCredentialsException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), exception.getMessage());
            errorDetail.setProperty("description", "The username or password is incorrect");

            return errorDetail;
        }

        if (exception instanceof AccountStatusException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "The account is locked");
        }

        if (exception instanceof AccessDeniedException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "You are not authorized to access this resource");
        }

        if (exception instanceof SignatureException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "The JWT signature is invalid");
        }

        if (exception instanceof ExpiredJwtException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "The JWT token has expired");
        }

        if (exception instanceof MalformedJwtException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(500), exception.getMessage());
            errorDetail.setProperty("description", "Malformed JWT JSON");
        }

        if (errorDetail == null) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(500), exception.getMessage());
            errorDetail.setProperty("description", "Unknown internal server error.");
        }


        return errorDetail;
    }

}