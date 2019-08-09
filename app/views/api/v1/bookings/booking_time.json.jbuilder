
json.array! @booking do |booking|
  json.extract! booking, :id, :start_time, :end_time, :duration
end

