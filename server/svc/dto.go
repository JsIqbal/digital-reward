package svc

type ErrorDetail struct {
	InternalCode string `json:"internalCode"`
	MessageEn    string `json:"messageEn"`
	MessageBn    string `json:"messageBn"`
}

type ErrorResponse struct {
	Timestamp   int64        `json:"timestamp"`
	Description string       `json:"description"`
	Error       *ErrorDetail `json:"error"`
}

type ResponseData struct {
	Timestamp   int64       `json:"timestamp"`
	Description string      `json:"description"`
	Data        interface{} `json:"data"`
}
