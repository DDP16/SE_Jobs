import React from 'react';
import { Box, Typography, IconButton, Chip, Link } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Link as LinkIcon } from '@mui/icons-material';

// Skills Section
export function SkillsSection({ skills, onEdit, onDelete, onAdd }) {
  // Ensure skills is always an array to prevent undefined errors
  const skillsArray = Array.isArray(skills) ? skills : [];

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Kỹ năng</Typography>
        <IconButton onClick={onAdd} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {skillsArray.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Liệt kê các kỹ năng chuyên môn của bạn
        </Typography>
      ) : (
        skillsArray.map((skillGroup) => (
          <Box key={skillGroup.id} sx={{ mb: 4, '&:last-child': { mb: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{skillGroup.groupName || skillGroup.name}</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  onClick={() => onEdit(skillGroup)}
                  size="small"
                  sx={{ p: 0.5, color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}
                >
                  <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(skillGroup.id)}
                  size="small"
                  sx={{ p: 0.5, color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skillGroup.skills?.map((skill, index) => (
                <Chip
                  key={index}
                  label={`${skill.name} (${skill.experience})`}
                  sx={{ bgcolor: '#E8E0FF', color: '#5E35B1', fontWeight: 500, borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}

// Languages Section
export function LanguagesSection({ languages, onEdit }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Ngoại ngữ</Typography>
        <IconButton onClick={onEdit} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {languages.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Liệt kê các ngôn ngữ mà bạn biết
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {languages.map((lang, index) => (
            <Chip
              key={index}
              label={`${lang.language} (${lang.level})`}
              sx={{ bgcolor: '#E8E0FF', color: '#5E35B1', fontWeight: 500, borderRadius: 2 }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

// Projects Section
export function ProjectsSection({ projects, onEdit, onDelete, onAdd }) {
  const formatDate = (startMonth, startYear, endMonth, endYear, isCurrentlyWorking) => {
    const startDate = startMonth ? `${String(startMonth).padStart(2, '0')}/${startYear}` : startYear;
    const endDate = isCurrentlyWorking ? 'HIỆN TẠI' : (endMonth ? `${String(endMonth).padStart(2, '0')}/${endYear}` : endYear);
    return `${startDate} - ${endDate}`;
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Dự án nổi bật</Typography>
        <IconButton onClick={onAdd} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {projects.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Giới thiệu dự án nổi bật của bạn
        </Typography>
      ) : (
        projects.map((project) => (
          <Box key={project.id} sx={{ mb: 4, '&:last-child': { mb: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{project.projectName || project.name}</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  onClick={() => onEdit(project)}
                  size="small"
                  sx={{ p: 0.5, color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}
                >
                  <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(project.id)}
                  size="small"
                  sx={{ p: 0.5, color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              {formatDate(project.startMonth, project.startYear, project.endMonth, project.endYear, project.isCurrentlyWorking)}
            </Typography>
            {project.description && (
              <Typography
                variant="body2"
                sx={{ color: 'text.primary', lineHeight: 1.6, mb: 1 }}
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
            {project.websiteLink && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <LinkIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Link
                  href={project.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  {project.websiteLink}
                </Link>
              </Box>
            )}
          </Box>
        ))
      )}
    </Box>
  );
}

// Certificates Section
export function CertificatesSection({ certificates, onEdit, onDelete, onAdd }) {
  const formatDate = (issueMonth, issueYear) => {
    return issueMonth ? `${String(issueMonth).padStart(2, '0')}/${issueYear}` : issueYear;
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Chứng chỉ</Typography>
        <IconButton onClick={onAdd} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {certificates.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Bổ sung chứng chỉ liên quan đến kỹ năng của bạn
        </Typography>
      ) : (
        certificates.map((cert) => (
          <Box key={cert.id} sx={{ mb: 4, '&:last-child': { mb: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{cert.certificateName || cert.name}</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  onClick={() => onEdit(cert)}
                  size="small"
                  sx={{ p: 0.5, color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}
                >
                  <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(cert.id)}
                  size="small"
                  sx={{ p: 0.5, color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>{cert.organization}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Issued: {formatDate(cert.issueMonth, cert.issueYear)}</Typography>
            {cert.description && (
              <Typography
                variant="body2"
                sx={{ color: 'text.primary', lineHeight: 1.6, mb: 1 }}
                dangerouslySetInnerHTML={{ __html: cert.description }}
              />
            )}
            {cert.certificateUrl && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <LinkIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Link
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  {cert.certificateUrl}
                </Link>
              </Box>
            )}
          </Box>
        ))
      )}
    </Box>
  );
}

// Awards Section
export function AwardsSection({ awards, onEdit, onDelete, onAdd }) {
  const formatDate = (issueMonth, issueYear) => {
    return issueMonth ? `${String(issueMonth).padStart(2, '0')}/${issueYear}` : issueYear;
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Giải thưởng</Typography>
        <IconButton onClick={onAdd} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {awards.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Thể hiện giải thưởng hoặc thành tích mà bạn đạt được
        </Typography>
      ) : (
        awards.map((award) => (
          <Box key={award.id} sx={{ mb: 4, '&:last-child': { mb: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{award.awardName || award.name}</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  onClick={() => onEdit(award)}
                  size="small"
                  sx={{ p: 0.5, color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}
                >
                  <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(award.id)}
                  size="small"
                  sx={{ p: 0.5, color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              {award.awardOrganization || award.organization}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Issued: {formatDate(award.issueMonth, award.issueYear)}
            </Typography>
            {award.description && (
              <Typography
                variant="body2"
                sx={{ color: 'text.primary', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: award.description }}
              />
            )}
          </Box>
        ))
      )}
    </Box>
  );
}
