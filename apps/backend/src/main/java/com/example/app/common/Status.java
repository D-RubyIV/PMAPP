package com.example.app.common;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Status {
    @JsonProperty("Pending")
    Pending,
    @JsonProperty("Confirmed")
    Confirmed,
    @JsonProperty("Processing")
    Processing,
    @JsonProperty("Shipped")
    Shipped,
    @JsonProperty("Delivered")
    Delivered,
    @JsonProperty("Cancelled")
    Cancelled,
    @JsonProperty("Returned")
    Returned,
}
