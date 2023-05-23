package com.vu.aezakmi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Entity was updated by another user.")
public class OptimisticLockingConflictException extends RuntimeException {

}
