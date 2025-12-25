import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

/* ======================================================
   FIX LEAFLET DEFAULT ICON ISSUE (REQUIRED)
   ====================================================== */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ======================================================
   ISSUE MAP COMPONENT
   ====================================================== */
const IssueMap = ({ issues = [] }) => {
  return (
    <MapContainer
      center={[22.9734, 78.6569]} // Center of India
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      {/* Base Map */}
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ======================
          MARKER CLUSTER GROUP
          ====================== */}
      <MarkerClusterGroup chunkedLoading>
        {issues.map((issue, index) => {
          // Skip issues without GPS
          if (!issue.latitude || !issue.longitude) return null;

          return (
            <Marker
              key={index}
              position={[issue.latitude, issue.longitude]}
            >
              <Popup>
                <strong>{issue.issue}</strong>
                <br />
                <span>{issue.location}</span>
                <br />
                <small>
                  <strong>Reported by:</strong> {issue.name}
                </small>
                <br />
                <small>
                  <strong>Date:</strong> {issue.date}
                </small>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default IssueMap;
